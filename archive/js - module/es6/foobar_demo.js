import { foo, bar } from './foobar.js';
foo();
bar();

import * as lib from './foobar.js';
lib.foo();
lib.bar();


// cách này cho phép ta chỉ import foo
/*
import mylib from 'foobar';
import {default as mylib} from 'foobar';
*/

// cách này cho phép ta import cả foo và bar
//import mylib, {bar} from 'foobar';