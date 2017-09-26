import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// quick fix for reference problem
// https://github.com/ionic-team/ionic-native/pull/1934#issuecomment-331861871
import { HTTP } from '@ionic-native/http';
HTTP.getPluginRef = () => "cordova.plugin.http";

platformBrowserDynamic().bootstrapModule(AppModule);
