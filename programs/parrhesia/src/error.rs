use anchor_lang::prelude::*;

#[error_code]
pub enum AppError {
    #[msg("Not allowed")]
    NotAllowed
}

#[error_code]
pub enum InsuffBalError {
    #[msg("Insufficient amount to withdraw.")]
    InvalidWithdrawAmount,
}

