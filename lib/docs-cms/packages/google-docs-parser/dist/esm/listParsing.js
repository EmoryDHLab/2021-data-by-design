let listProperties = {};
export function registerLists(document) {
    if (document.lists) {
        for (const id in document.lists) {
            listProperties[id] = document.lists[id].listProperties;
        }
    }
}
export function extractLists(contentArray, depth = -1) {
    const isListEl = (el) => {
        var _a;
        const bullet = (_a = el === null || el === void 0 ? void 0 : el.paragraph) === null || _a === void 0 ? void 0 : _a.bullet;
        if (!bullet)
            return false;
        const elDepth = bullet.nestingLevel || 0;
        return elDepth > depth;
    };
    let newArr = [];
    let currList = {};
    const pushCurrList = () => {
        const list = {
            list: {
                items: extractLists(currList.items, depth + 1),
                properties: listProperties[currList.listId].nestingLevels[depth + 1]
            }
        };
        newArr.push(list);
    };
    for (let el of contentArray) {
        if (isListEl(el)) {
            const listEl = el;
            let currId = listEl.paragraph.bullet.listId;
            if (!currList.listId) {
                currList = {
                    listId: currId,
                    items: [listEl]
                };
                continue;
            }
            if (currList.listId == currId) {
                currList.items.push(listEl);
                continue;
            }
            pushCurrList();
            currList = {
                listId: currId,
                items: [listEl]
            };
            continue;
        }
        if (currList.listId) {
            pushCurrList();
            currList = {};
        }
        newArr.push(el);
    }
    if (currList.listId) {
        pushCurrList();
    }
    return newArr;
}
//# sourceMappingURL=listParsing.js.map