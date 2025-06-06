import { Page } from '@playwright/test';
import UploadComponent from './component/uploadcomponent';
class CartPage {
    page : Page;

    constructor(page: Page){
        this.page = page;
    }

    uploadComponent(){
        return new UploadComponent(this.page);
    }
}

export default CartPage;