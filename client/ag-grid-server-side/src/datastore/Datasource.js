import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

const datasource = () => {
  return {
    getRows: (params) => {
      console.log(JSON.stringify(params.request, null, 1));
      let { startRow, endRow, filterModel, sortModel } = params.request

      sortModel = sortModel.length > 0 ? sortModel : undefined;
      const visibleColumnIds = params.columnApi.getAllDisplayedColumns().map(col => col.getColId());

      const query = {
        query: gql`
          query GetRows($startRow: Int!, $endRow: Int!, $sortModel: [SortModel]) {
            getRows(startRow: $startRow, endRow: $endRow, sortModel: $sortModel) {
                lastRow
                rows { 
                    id, 
                    ${visibleColumnIds.join('\n')}
                }
            }
        }
        `,
        variables: {
          startRow,
          endRow,
          sortModel,
          filterModel
        }
    }

      client.query(query)
      .then(res => res.data.getRows)
      .then(({ lastRow, rows }) => {
          console.log('Response', lastRow, rows);
          params.successCallback(rows, lastRow);
      })
      .catch(err => {
          console.log('Error', err);
          params.failCallback();
      });
    }
  }  
};

export default datasource;