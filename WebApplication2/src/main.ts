import {canvasViweModel} from './canvasViewModel';
import * as ko from 'knockout';
import './bindings/fadeVisibleBinding'


ko.applyBindings(new canvasViweModel());
