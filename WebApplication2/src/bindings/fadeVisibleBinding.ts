import * as ko from 'knockout';

ko.bindingHandlers.fadeVisible = {
    init: (element, valueAccessor) => { },
    update: (element, valueAccessor) => {
        var shouldDisplay = valueAccessor();
        if (shouldDisplay) {
            element.classList.remove("fadableHidden");
            element.classList.add("fadableShown");
        }
        else {
            element.classList.remove("fadableShown");
            element.classList.add("fadableHidden");
        }
    }
};