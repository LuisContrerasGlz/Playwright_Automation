import {expect,  type Locator, type Page } from "@playwright/test";

export class letcodePages{
    readonly page: Page;
    readonly linkButton: Locator;
    readonly fruitsDropdown: Locator;
    readonly superHeroDropdown: Locator;
    readonly langDropdown: Locator;
    readonly countryDropdown: Locator;

    constructor (page: Page){
        this.page = page;
        this.linkButton = this.page.getByRole('link', { name: 'Drop-Down' });
        this.fruitsDropdown = page.locator('#fruits');
        this.superHeroDropdown = page.locator('#superheros');
        this.langDropdown = page.locator('#lang');
        this.countryDropdown = page.locator('#country');
    }

    async clickLink(){
        await this.linkButton.click();
    }

    async selectFruit(fruit: string){
        await this.fruitsDropdown.selectOption({ label: fruit });
    }

    async selectedFruit(){
        const fruit = await this.fruitsDropdown.evaluate(el => {
            const selectElement = el as HTMLSelectElement;
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            return selectedOption ? selectedOption.text : '';
        });
        return fruit;
    }

    async selectSuper(superHero: string){
        await this.superHeroDropdown.selectOption({ label: superHero });
    }

    async selectedSuper(){
        const superHero = await this.superHeroDropdown.evaluate(el => {
            const selectElement = el as HTMLSelectElement;
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            return selectedOption ? selectedOption.text : '';
        });
        return superHero;
    }

    async avaibleLang(){
        const options = await this.langDropdown.evaluate(el => {
            const selectElement = el as HTMLSelectElement;
            return Array.from(selectElement.options).map(option => option.text);
          });
        return options;
    }

    async selectLang(lang: string){
        await this.langDropdown.selectOption({ label: lang });
    }

    async selectCountry(country: string){
        await this.countryDropdown.selectOption({ label: country });
    }

    async selectedCountry(){
        const selectedCountry = await this.countryDropdown.evaluate(el => {
            const selectElement = el as HTMLSelectElement;
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            return selectedOption ? selectedOption.text : '';
        });
        return selectedCountry;
    }
}