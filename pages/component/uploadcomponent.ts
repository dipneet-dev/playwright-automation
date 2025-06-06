import { Page } from '@playwright/test';

class UploadComponent {
    page : Page;

    constructor(page: Page){
        this.page = page;
    }
}

export default UploadComponent;