use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct Profile {
    pub authority: Pubkey,
    pub name: String, 
    pub bio: String,
    pub membership_plan_count: u8
}

#[account]
#[derive(Default)]
pub struct MembershipPlan {
    pub authority: Pubkey,
    pub name: String,
    pub description: String,
    pub amount: u64,
    pub count: u64
}

#[account]
#[derive(Default)]
pub struct Post {
    pub authority: Pubkey,
    pub body: String,
    pub boost_amt: u64,
    pub timestamp: i64,
}

#[account]
#[derive(Default)]
pub struct Image {
    pub authority: Pubkey,
    pub img_ref: String,
    pub post: Pubkey,
}


#[account]
#[derive(Default)]
pub struct Comment {
    pub authority: Pubkey,
    pub body: String,
    pub post: Pubkey,
    pub timestamp: i64,
}
