import {expect,  type Locator, type Page } from "@playwright/test";

export class buttonLetcodePages{
    readonly page: Page;
    readonly buttonLink: Locator;
    readonly goHomeButton: Locator;
    readonly FindLocationButton: Locator;
    readonly colorButton: Locator;
    readonly tallFatButton: Locator;
    readonly disabledButton: Locator;
    readonly clickHoldButton: Locator;


    constructor (page: Page){
        this.page = page;
        this.buttonLink = page.getByRole('link', { name: 'Click' });
        this.goHomeButton = page.getByLabel('Goto Home and come back here');
        this.FindLocationButton = page.getByRole('button',{name:'Find Location'})
        this.colorButton = page.getByLabel('Find the color of the button');
        this.tallFatButton =  page.getByRole('button',{name:'How tall & fat I am?'});
        this.disabledButton = page.getByRole('button',{name:'Disabled'}) 
        this.clickHoldButton = page.getByRole('button', { name: 'Button Hold!' });
        
    }

    async buttonLinkClick(){
        await this.buttonLink.click();
    }

    async goHomeClick(){
        await this.goHomeButton.click();
    }

    async boundigBoxFindLocation(){
        return await this.FindLocationButton.boundingBox();
    }

    async colorButtonColor(){
        const colorOfButton = await this.colorButton.evaluate(el => window.getComputedStyle(el).color);
        return colorOfButton;
    }

    async howTallFatButton(){
        const boundingBox = await this.tallFatButton.boundingBox();
        return boundingBox;
    }

    async isDisabledButton(){
        const isDisabled = await this.disabledButton.isDisabled();
        return isDisabled;
    }
    
    


}