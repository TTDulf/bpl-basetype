const uniques = require('./uniques.json');
const score = require('./bpl-score.json')
const bplsets = require('./bpl-sets.json')

const rawmap = new Map()
const map = new Map()

for (let category of uniques.result) {
    for (let entry of category.entries) {
        rawmap.set(entry.name, entry.type)
    }
}

rawmap.forEach((value, key) => {
    if(bplsets.indexOf(key) != -1){
        map.set(key, value)
    }
})

var team = score.scores.Explorers

team.replicas.items.forEach(item => {
    map.delete(item)
})

for (let set of team.unique_sets.sets) {
    for (let item of set.items) {
        if(set.variants[item]){
            if (set.variants[item].found_values.length == set.variants[item].possible_values.length){
                map.delete(item)
            }
        } else {
            map.delete(item)
        }
    }
}

const valueMap = new Map()

map.forEach((value, key) => {
    if(valueMap.get(value)) {
        valueMap.get(value).push(key)
    } else {
        valueMap.set(value, [key])
    }
})

console.log(valueMap)