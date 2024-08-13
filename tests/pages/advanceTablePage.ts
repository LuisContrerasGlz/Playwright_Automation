import {expect,  type Locator, type Page } from "@playwright/test";

export class advancedTable{
    readonly page: Page;
    readonly buttonLink: Locator;
    readonly atLengthSelector: Locator;
    readonly namesTable: Locator;
    readonly rowsNamesTable: Locator;
    readonly searchText: Locator;
    readonly columnHeader: Locator;
    readonly paginationContainer: Locator;
    readonly lastPageButton: Locator;
    readonly pageButtons: Locator;
    
    constructor (page: Page){
        this.page = page;
        this.buttonLink = page.getByRole('link', { name: 'Advance Table' });
        this.atLengthSelector = page.locator('#advancedtable_length select');
        this.namesTable =  page.locator('#advancedtable');
        this.rowsNamesTable = this.namesTable.locator('tbody tr');
        this.searchText = page.getByLabel('Search:');
        this.columnHeader = page.locator('#advancedtable thead th');
        this.paginationContainer = page.locator('#advancedtable_paginate');
        this.lastPageButton = this.paginationContainer.locator('a.paginate_button', { hasText: 'Last' });
        this.pageButtons = this.paginationContainer.locator('a.paginate_button')

    }

    async buttonLinkClick(){
        await this.buttonLink.click();
    }

    async aleSelectOption(option: string){
        await this.atLengthSelector.selectOption({ label: option });
    }

    async aleSelectedOption(){
        const selectedText = await this.atLengthSelector.evaluate(el => {
            const selectElement = el as HTMLSelectElement;
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            return selectedOption ? selectedOption.text : '';
        });
        return selectedText;
    }

    async countRowsNamesTable(){
        const rowCount = await this.rowsNamesTable.count();
        return rowCount;
    }

    async fillSearch(tex: string){
        await this.searchText.fill(tex);
    }


    async selectPage(pageNumber: string) {
        const pageButton = this.paginationContainer.locator('a.paginate_button', { hasText: pageNumber });
        await pageButton.click();
    }

    async selectPrevious() {
        const previousPageButton = this.paginationContainer.locator('a.paginate_button', { hasText: 'Previous' });
        await previousPageButton.click();
    }

    async selectNext() {
        const nextPageButton = this.paginationContainer.locator('a.paginate_button', { hasText: 'Next' });
        await nextPageButton.click();
    }

    async selectLast() {
        const nextPageButton = this.paginationContainer.locator('a.paginate_button', { hasText: 'Last' });
        await nextPageButton.click();
    }


    async isPageActive(pageNumber: string) {
        const activePageButton = this.paginationContainer.locator('a.paginate_button.current', { hasText: pageNumber });
        return activePageButton.isVisible();
    }

}