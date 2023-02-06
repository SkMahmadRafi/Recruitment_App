// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fetchAllMst_api:'http://20.192.1.163:3000/listDataMasterManager/fetchalllistdatamaster',
    getListDtlByMstId_api:`http://20.192.1.163:3000/listDataDetailManager/fetchListDetail/`,
    addMst_api:`http://20.192.1.163:3000/listDataMasterManager/postdatamaster` , 
    editMst_api:`http://20.192.1.163:3000/listDataMasterManager/updateDataMaster/` ,
    addList_api:`http://20.192.1.163:3000/listDataDetailManager/addListDetail`,
    editList_api:`http://20.192.1.163:3000/listDataDetailManager/updateListDetail` ,
     deleteMst_api:`http://20.192.1.163:3000/listDataMasterManager/deleteRecord/`,
    deleteList_api:`http://20.192.1.163:3000/listDataDetailManager/deleteListDetail/`
};

/*
 * For easier debugging in development mode, you can import the following file  ip : 20.192.1.163
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
