
use anchor_lang::prelude::*;

pub mod error;
pub mod states;

use crate::error::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("7u18B2KUkivrUCegw5KEKNCNjjCYVmukeBx4Sh8rfBWC");

#[program]
mod parrhesia {
    use super::*;

    pub fn create_profile(ctx: Context<CreateProfile>, name: String, bio: String) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        profile.authority = ctx.accounts.signer.key();
        profile.name = name;
        profile.bio = bio;
        profile.membership_plan_count = 0;

        Ok(())
    }

    pub fn create_membership_plan(
        ctx: Context<CreateMembershipPlan>,
        name: String,
        description: String,
        amount: u64,
    ) -> Result<()> {
        let membership_plan = &mut ctx.accounts.membership_plan;
        let profile = &mut ctx.accounts.profile;

        membership_plan.authority = ctx.accounts.authority.key();
        membership_plan.name = name;
        membership_plan.description = description;
        membership_plan.amount = amount;
        membership_plan.count = 0;

        profile.membership_plan_count = profile.membership_plan_count.checked_add(1).unwrap();

        Ok(())
    }

    pub fn buy_membership(ctx: Context<BuyMembership>) -> Result<()> {
        require!(
            ctx.accounts.membership_plan.authority == ctx.accounts.authority.authority,
            AppError::NotAllowed
        );

        let transaction_msg = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.signer.key(),
            &ctx.accounts.authority.key(),
            ctx.accounts.membership_plan.amount,
        );

        // TODO handle error
        anchor_lang::solana_program::program::invoke(
            &transaction_msg,
            &[
                ctx.accounts.signer.to_account_info(),
                ctx.accounts.authority.to_account_info(),
            ],
        );
        let membership_plan = &mut ctx.accounts.membership_plan;
        membership_plan.count += 1;
        Ok(())
    }

    pub fn create_post(ctx: Context<CreatePost>, body: String) -> Result<()> {
        if (body.chars().count() > 300) {
            return err!(error::AppError::SizeExceeded);
        };

        let post = &mut ctx.accounts.post;
        post.authority = ctx.accounts.authority.key();
        post.body = body;
        post.timestamp = Clock::get().unwrap().unix_timestamp;
        post.boost_amt = 0;

        Ok(())
    }

    pub fn delete_post(ctx: Context<DeletePost>) -> Result<()> {
        Ok(())
    }

    pub fn create_comment(ctx: Context<CreateComment>, body: String) -> Result<()> {
        if (body.chars().count() > 300) {
            return err!(error::AppError::SizeExceeded);
        };

        let comment = &mut ctx.accounts.comment;
        let post = &mut ctx.accounts.post;
        let authority = &mut ctx.accounts.authority;

        comment.authority = authority.key();
        comment.post = post.key();
        comment.body = body;
        comment.timestamp = Clock::get().unwrap().unix_timestamp;

        Ok(())
    }

    pub fn delete_comment(ctx: Context<DeleteComment>) -> Result<()> {
        Ok(())        
    }   

    pub fn create_image(ctx: Context<CreateImage>, img_ref: String) -> Result<()> {
        let image = &mut ctx.accounts.image;
        let post = &mut ctx.accounts.post;

        image.authority = ctx.accounts.authority.key();
        image.post = post.key();
        image.img_ref = img_ref;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        let authority = &mut ctx.accounts.authority;

        let rent_balance = Rent::get()?.minimum_balance(profile.to_account_info().data_len());

        if **profile.to_account_info().lamports.borrow() - rent_balance < amount {
            return Err(error::InsuffBalError::InvalidWithdrawAmount.into());
        }

        **profile.to_account_info().try_borrow_mut_lamports()? -= amount;
        **authority.to_account_info().try_borrow_mut_lamports()? += amount;

        Ok(())
    }

    pub fn boost_post(ctx: Context<BoostPost>, amount: u64) -> Result<()> {
        
        require!(
            ctx.accounts.profile.authority == ctx.accounts.post.authority,
            AppError::NotAllowed
        );
        
        let transaction_msg = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.signer.key(),
            &ctx.accounts.profile.key(),
            amount,
        );

        anchor_lang::solana_program::program::invoke(
            &transaction_msg,
            &[
                ctx.accounts.signer.to_account_info(),
                ctx.accounts.profile.to_account_info(),
            ],
        );
        let post = &mut ctx.accounts.post;
        post.boost_amt += amount;
        Ok(())
    }

}

#[derive(Accounts)]
pub struct CreateProfile<'info> {
    #[account(init, payer=signer, space=10000, seeds=[b"PROFILE_STATE".as_ref(), signer.key().as_ref()], bump)]
    pub profile: Account<'info, states::Profile>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct CreateMembershipPlan<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        //seeds = [b"PROFILE_STATE", authority.key().as_ref()],
        //bump,
        has_one = authority
    )]
    pub profile: Box<Account<'info, states::Profile>>,

    #[account(
        init, 
        payer=authority, 
        space=8 + std::mem::size_of::<states::MembershipPlan>(), 
        //seeds=[b"MEMBERSHIP_PLAN_STATE", authority.key().as_ref(), &[profile.membership_plan_count as u8].as_ref()], 
        //bump
    )]
    pub membership_plan: Box<Account<'info, states::MembershipPlan>>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(pk: Pubkey)]
pub struct BuyMembership<'info> {
    #[account(mut)]
    pub authority: Account<'info, states::Profile>,
    #[account(mut)]
    pub membership_plan: Box<Account<'info, states::MembershipPlan>>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(init, payer=authority, space=8 + std::mem::size_of::<states::Post>())]
    pub post: Account<'info, states::Post>,

    #[account(mut, has_one=authority)]
    pub profile: Account<'info, states::Profile>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeletePost<'info> {
    #[account(mut, has_one = authority, close = authority)]
    pub post: Account<'info, states::Post>,

    #[account(mut)]
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CreateComment<'info> {
    #[account(init, payer=authority, space = 8 + std::mem::size_of::<states::Comment>())]
    pub comment: Account<'info, states::Comment>,
    
    #[account(mut, has_one=authority)]
    pub profile: Account<'info, states::Profile>,

    #[account(mut)]
    pub post: Account<'info, states::Post>,


    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteComment<'info> {
    #[account(mut, has_one=authority, close=authority)]
    pub comment: Account<'info, states::Comment>,

    #[account(mut)]
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CreateImage<'info> {
    #[account(mut, has_one=authority)]
    pub post: Account<'info, states::Post>,

    #[account(init, payer=authority, space =  8 + std::mem::size_of::<states::Image>())]
    pub image: Account<'info, states::Image>,

    #[account(mut)]
    pub authority: Signer<'info>,

    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub profile: Account<'info, states::Profile>,

    #[account(mut)]
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct BoostPost<'info> {
    #[account(mut)]
    pub post: Account<'info, states::Post>,

    #[account(mut)]
    pub profile: Account<'info, states::Profile>,

    #[account(mut)]
    pub signer: Signer<'info>,

    system_program: Program<'info, System>,
}
