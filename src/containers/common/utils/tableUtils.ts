import { SearchResultTableTitle } from '../model/types';

export const getInitTableTitleStatus = (
    titlesTextAndCodeMap: Array<Pick<SearchResultTableTitle, 'titleText' | 'titleCode'>>,
    functionalButtonColumnStatus: 'showFunctionalColumn' | 'discardFunctionalColumn' = 'showFunctionalColumn'
) => {
    let initTableTitleStatus: Array<SearchResultTableTitle> = [];
    if (functionalButtonColumnStatus === 'showFunctionalColumn')
        initTableTitleStatus = new Array({
            isCheckbox: true,
            function: 'del',
            titleText: '',
            titleCode: 'functionalButtons',
            isDisplay: true
        });

    titlesTextAndCodeMap.map((item) => {
        const { titleText, titleCode } = item;
        initTableTitleStatus.push({
            isCheckbox: false,
            function: '',
            titleText,
            titleCode,
            isDisplay: true
        });
    });

    return initTableTitleStatus;
};

export const getTransferListConfigs = (
    titlesTextAndCodeMap: Array<Pick<SearchResultTableTitle, 'titleText' | 'titleCode'>>
) => {
    const transferListConfigs: any[] = [];
    titlesTextAndCodeMap.map((item) => {
        const { titleText, titleCode } = item;
        if (titleCode !== 'rowNumber')
            transferListConfigs.push({
                id: titleCode,
                name: titleText,
                isSelected: false,
                isChecked: false
            });
    });

    return transferListConfigs;
};
