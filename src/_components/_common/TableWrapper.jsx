import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Colors from '../../assets/styles/js/Color';
import LinearProgress from '@mui/material/LinearProgress';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    root: {
        color: Colors.BlackThemeColor,
        backgroundColor: Colors.WhiteThemeColor,
        justifyContent: 'center',
        border: 'none !important',
        '&.css-vcjdx3': {
            backgroundColor: `${Colors.MainThemeColor}  !important`
        },
        '&.css-1inm7gi': {
            backgroundColor: Colors.WhiteThemeColor
        },
        '&.css-cc8tf1': {
            fontWeight: 'bold',
            opacity: 0.7
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
            justifyContent: 'center',
        },
        '& .MuiDataGrid-cell': {
            justifyContent: 'center !important',
            alignContent: 'center'
        },
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
        },
        '& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            opacity: '0.7'
        },
        '&.css-1kwdphh-MuiDataGrid-virtualScrollerContent': {
            backgroundColor: Colors.WhiteThemeColor
        },
        '&.css-17jjc08-MuiDataGrid-footerContainer': {
            backgroundColor: Colors.WhiteThemeColor
        }
    }
}));

export { TableWrapper };

function TableWrapper({ pageState, setPageState }) {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <DataGrid
                components={{
                    LoadingOverlay: LinearProgress,
                }}
                autoHeight
                rows={pageState.data}
                rowCount={pageState.total}
                loading={pageState.isLoading}
                rowsPerPageOptions={[5, 10]}
                pagination
                page={pageState.pageNo - 1}
                pageSize={pageState.pageSize}
                paginationMode="server"
                onPageChange={(newPage) => {
                    setPageState(old => ({ ...old, pageNo: newPage + 1 }))
                }}
                onPageSizeChange={(newPageSize) => {
                    setPageState(old => ({ ...old, pageSize: newPageSize }))
                }}
                columns={pageState.columns}
                className={classes.root}
            />
        </ThemeProvider>
    );
}
