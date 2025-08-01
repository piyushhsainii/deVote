#![allow(clippy::result_large_err)]
use anchor_lang::{prelude::*};

declare_id!("FqzkXZdwYjurnUKetJCAvaUw5WAqbwzU6gZEwydeEfqS");

 #[program]
pub mod voting {
    use super::*;

    pub fn initialise_acc(
        ctx:Context<IntialisePoll>,
        poll_id:u64,
        poll_start:u64,
        poll_end:u64,
        poll_description:String,
    )-> Result<()>{
        let acc = &mut ctx.accounts.poll_acount;
        acc.poll_id = poll_id;
        acc.poll_start =  poll_start;
        acc.poll_end = poll_end;
        acc.poll_description = poll_description;
        acc.candidates_amount = 0;
        Ok(())
    }

    pub fn initialise_candidate(
        ctx:Context<User>,
        candidate_name:String
    )-> Result<()>{
        let user = &mut ctx.accounts.user_account;
        user.candidate_name = candidate_name;
        user.candidate_votes = 0;
        ctx.accounts.poll.candidates_amount += 1;
        Ok(())
    }

    pub fn vote(ctx:Context<Vote>,_poll_id:u64)->Result<()> {
        let candidate = &mut ctx.accounts.candidate;
        candidate.candidate_votes += 1; 
        msg!("Voted for candidate {}",candidate.candidate_name);
        msg!("Total candidate votes {}",candidate.candidate_votes);
        Ok(())
    }



}

#[derive(Accounts)]
#[instruction(poll_id:u64)]
pub struct IntialisePoll<'info> {
    #[account(mut)]
    pub signer:Signer<'info>,
    #[account(
        init,
        payer= signer,
        space= 8 + Poll::INIT_SPACE,
        seeds=[b"poll" , poll_id.to_le_bytes().as_ref()],
        bump
    )]
    pub poll_acount:Account<'info,Poll>,
    pub system_program:Program<'info, System>

}


#[account]
#[derive(InitSpace)]
pub struct Poll {
    // #[max_len(258)]
    pub poll_id:u64,
    #[max_len(258)]
    pub poll_description:String,
    pub poll_start:u64,
    pub poll_end:u64,
    pub candidates_amount:u64
}


#[derive(Accounts)]
#[instruction(poll_id:u64)]
pub struct User<'info> {
    #[account(mut)]
    pub signer:Signer<'info>,
    #[account(
        init,
        payer=signer,
        space = 8,
        seeds = [b"candidate",signer.key().as_ref()],
        bump
    )]
    pub user_account:Account<'info,Candidate>,
    #[account(
        seeds=[b"poll",poll_id.to_le_bytes().as_ref()],
        bump
    )]
    pub poll:Account<'info,Poll>,
    pub system_program:Program<'info,System>
}


#[account]
#[derive(InitSpace)]
pub struct Candidate {
    #[max_len(258)]
    pub candidate_name:String,
    pub candidate_votes:u64
}

#[derive(Accounts)]
#[instruction(poll_id:u64)]
pub struct Vote<'info> {
    #[account(mut)]
    pub signer:Signer<'info>,
    #[account(
        mut,
        seeds=[b"candidate",signer.key().as_ref()],
        bump
    )]
    pub candidate:Account<'info,Candidate>,
    #[account(
        mut,
        seeds=[b"poll" , poll_id.to_le_bytes().as_ref()],
        bump
        
    )]
    pub poll:Account<'info,Poll>,
}
