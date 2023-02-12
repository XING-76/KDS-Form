import { storesType } from '@containers/reducers';
import { SearchResultTableTitle } from '@containers/common/model/types';
import Table from '@modules/Table';
import TableBody from '@modules/TableBody';
import TableCell from '@modules/TableCell';
import TableHead from '@modules/TableHead';
import TableRow from '@modules/TableRow';
import { isEmptyArray } from '@utils/arrayUtils';
import React from 'react';
import { useSelector } from 'react-redux';

type Props = {
    searchResultTableTitles: Array<SearchResultTableTitle>;
};

const SearchResultTable = (props: Props) => {
    const { searchResultTableTitles } = props;

    const { searchResult: data } = useSelector((state: storesType) => ({
        ...state.df0001
    }));

    const [tableData, setTableData] = React.useState({
        tableTitle: searchResultTableTitles,
        tableBody: data
    });

    const table = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const tableElement = table.current;
    const [tableHeight, setTableHeight] = React.useState(0);

    /**
     * 回傳目前參數的欄位是否顯示
     * @param titleCode 欄位代碼 titleCode
     * @returns
     */
    const checkIsColumnDisplay = (titleCode: string) => {
        let isColumnDisplay = false;
        tableData.tableTitle.forEach((item) => {
            if (item.titleCode === titleCode && item.isDisplay) isColumnDisplay = true;
        });

        return isColumnDisplay;
    };

    const isResizeShow = (index: number) => {
        const tableTitleLength = tableData.tableTitle.length;
        const FunctionalButtonColumnIndex = tableData?.tableTitle.findIndex(
            (item) => item.titleCode === 'functionalButtons'
        );
        let isSkipColumn = index !== tableTitleLength - 1;
        if (FunctionalButtonColumnIndex >= 0) isSkipColumn = isSkipColumn && index !== FunctionalButtonColumnIndex;

        return isSkipColumn && !isEmptyArray(tableData.tableBody);
    };

    React.useEffect(() => {
        const newTableHeight = tableElement?.offsetHeight ?? 0;
        setTableHeight(newTableHeight);
    }, [tableData]);

    React.useEffect(() => {
        return setTableData({
            ...tableData,
            tableBody: data
        });
    }, [data]);

    return (
        <div className="securitiesSelectData__searchResultTable_wrapper" ref={table}>
            <Table className="table__column_sticky">
                <TableHead>
                    <TableRow>
                        {tableData.tableTitle.map((title, index) => {
                            if (title.isDisplay) {
                                return (
                                    <TableCell
                                        key={index}
                                        isResizeHandleShow={isResizeShow(index)}
                                        id={title.titleCode}
                                        tableHeight={tableHeight}>
                                        {title.titleText}
                                    </TableCell>
                                );
                            }
                            return <React.Fragment key={index} />;
                        })}
                    </TableRow>
                </TableHead>
                <TableBody noDataText="查詢結果無資料">
                    {tableData.tableBody?.map((item: { [key: string]: any }, index: number) => (
                        <TableRow key={index}>
                            {Object.entries(item).map((subItem, index) => {
                                const [titleCode, cellValue] = subItem;
                                if (checkIsColumnDisplay(titleCode))
                                    return (
                                        <TableCell id={titleCode} key={index}>
                                            {cellValue}
                                        </TableCell>
                                    );
                                return <React.Fragment key={index} />;
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SearchResultTable;
