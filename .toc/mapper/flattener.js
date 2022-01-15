

const hasTheGoods = (obj, gossip) => {
    //gossip is an object with a string of the most important key (seriously) and an array of the keys we want to return (juicy)
    let {seriously, juicy} = gossip;
    if(obj[seriously]) {
        let juice = juicy.reduce((pitcher, squeeze) => {
            let squirt = obj[squeeze] ? obj[squeeze] : "";
            return {
                [squeeze]: squirt,
                ...pitcher
            }
        }, {});
        return [{
            [seriously]: obj[seriously],
            ...juice
        }]
    } else {
        return [];
    }
}

const hasTea = (obj, gossip) => {
    //gossip is an object with a string at the key ("spill") that holds the array we want to recurse into if it's present in obj
    let {spill} = gossip;
    if(obj[spill]) {
        return obj[spill]; // will be an array
    } else {
        return null;
    }
}

const getThe411 = (obj, gossip) => {
    let tea = hasTea(obj, gossip);
    let theGoods = hasTheGoods(obj, gossip);
    return {tea, theGoods};
}

const spillTheTea = (arr, gossip) => {
    // console.log(arr);
    return arr.reduce((all, node) => {
        let the411 = getThe411(node, gossip);
        let {theGoods} = the411;
        if(the411.tea) {
            let theTea = spillTheTea(the411.tea, gossip);
            return all.concat(theGoods.concat(theTea));
        } else {
            return all.concat(theGoods);
        }
    }, []);
}

const flatten = (obj, gossip) => {
    let theGoods = hasTheGoods(obj, gossip);
    let {spill} = gossip;
    let theTea = spillTheTea(obj[spill], gossip);
    let theSkinny = theGoods.concat(theTea);
    // console.log(theSkinny);
    return theSkinny;
}

module.exports = flatten;