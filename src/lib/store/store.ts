import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../../features/admin/adminSlice';
import filtersReducer from '../../features/admin/filter/filterSlice';
import partnerReducer from '../../features/partner/partnerSlice';
import advertiserReducer from '../../features/advertiser/advertiserSlice';
import messageReducer from '../../features/admin/message/messageSlice';

export const makeStore = () => configureStore({reducer:{
    adminDashboard: adminReducer,
    partnerDashboard: partnerReducer,
    advertiserDashboard: advertiserReducer,
    filterAdminDashboard: filtersReducer,
    messageAdminDashboard: messageReducer,
}})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];