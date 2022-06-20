const API_URL = `http://localhost:4000/olympic?`

const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));
      const { startRow, endRow, filterModel, sortModel } = params.request
      let url = API_URL
      //Sorting
      if (sortModel.length) {
        const { colId, sort } = sortModel[0]
        url += `_sort=${colId}&_order=${sort}&`
      }
      //Filtering
      const filterKeys = Object.keys(filterModel)
      filterKeys.forEach(filter => {
        url += `${filter}=${filterModel[filter].filter}&`
      })
      //Pagination
      url += `_start=${startRow}&_end=${endRow}`
      fetch(url)
        .then(httpResponse => httpResponse.json())
        .then(response => {
          // params.successCallback(response, 6000);
          params.success({
            rowData: response, 
            rowCount: 6000});
        })
        .catch(error => {
          console.error(error);
          // params.failCallback();
          params.fail();
        })
    }
  };

  export default datasource;