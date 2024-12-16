import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { prodajaArtikalaSlice } from "src/sections/blog/view/prodajaArtikalaSlice";
import { cashRegisterSlice } from "src/sections/overview/view/cashRegisterSlice";
import { oslobodjenoPorezaSlice } from "src/sections/overview/view/oslobodjenoPorezaSlice";
import { previousCashRegisterSlice } from "src/sections/overview/view/previousCashRegisterSlice";
import { prodajaArtikalaPoOperaterimaSlice } from "src/sections/overview/view/prodajaArtikalaPoOperaterimaSlice";
import { prometPoKupcimaSlice } from "src/sections/overview/view/prometPoKupcimaSlice";
import { utrosenaRobaSlice } from "src/sections/overview/view/utrosenaRobaSlice";
import {dateSlice} from "src/sections/product/view/dateSlice";
import { previousDateSlice } from "src/sections/product/view/previousDateSlice";
import { prodajaPoOperaterimaSlice } from "src/sections/product/view/prodajaPoOperaterimaSlice";
import { racuniSlice } from "src/sections/product/view/racuniSlice";
import { stanjeRobeSlice } from "src/sections/product/view/stanjeRobeSlice";
import { poreziPoGrupamaSlice } from "src/sections/user/view/poreziPoGrupamaSlice";
import { poreziSlice } from "src/sections/user/view/poreziSlice";
import { vrstePlacanjaSlice } from "src/sections/user/view/vrstePlacanjaSlice";

export const data=configureStore({
    reducer:{
        articles_sales: prodajaArtikalaSlice.reducer,
        waiters_sales: prodajaPoOperaterimaSlice.reducer,
        taxes_total:  poreziSlice.reducer,
        taxes_tags: poreziPoGrupamaSlice.reducer,
        goods_spent: utrosenaRobaSlice.reducer,
        payment_types: vrstePlacanjaSlice.reducer,
        waiters_articles_sales: prodajaArtikalaPoOperaterimaSlice.reducer,
        customers_sales: prometPoKupcimaSlice.reducer,
        invoices_num: prodajaArtikalaPoOperaterimaSlice.reducer,
        tax_free: oslobodjenoPorezaSlice.reducer,
        storage_report: stanjeRobeSlice.reducer,
        invoices: racuniSlice.reducer,
        cash_register: cashRegisterSlice.reducer,
        date_range: dateSlice.reducer,
        previous_cash_register: previousCashRegisterSlice.reducer,
        previous_date_range: previousDateSlice.reducer,
    },
    
})



export default data;
export type RootState= ReturnType<typeof data.getState>;
export type AppDispatch= typeof data.dispatch;
export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState>= useSelector;