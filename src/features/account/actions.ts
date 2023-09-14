import { createAction } from "@reduxjs/toolkit"
import { Account, AccountReponse } from "../../model/account"

export const login = createAction<Account>('account/login')
export const loginSuccess = createAction<AccountReponse>('account/loginSuccess')
export const loginFailed = createAction<string>('account/loginFailed')

