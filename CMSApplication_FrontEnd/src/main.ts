import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';

import { AppModule } from './app/app.module';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVJzWmFZfVpgcF9CZlZRRmYuP1ZhSXxXdkBiX39adHJVRWBYUUQ=');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
