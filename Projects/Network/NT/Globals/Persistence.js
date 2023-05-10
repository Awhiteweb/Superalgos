/**
 * 
 * @typedef {{
 *     initialize: initialize,
 *     finalize: finalize,
 *     saveItem: saveItem,
 *     saveAll: saveAll,
 *     deleteItem: deleteItem,
 *     deleteAll: deleteAll,
 *     findItem: findItem,
 *     findMany: findMany,
 * }} NetworkPersistenceModel
 */

/**
 * 
 * @returns {NetworkPersistenceModel}
 */
exports.newNetworkGlobalsPersistence = function newNetworkGlobalsPersistence() {
    const thisObject = {
        initialize: initialize,
        finalize: finalize,
        saveItem: saveItem,
        saveAll: saveAll,
        deleteItem: deleteItem,
        deleteAll: deleteAll,
        findItem: findItem,
        findMany: findMany,
    }

    let store

    return thisObject

    /**
     * @param {string} storeType 
     * @param {string} name 
     */
    function initialize(storeType, name) {
        switch(storeType) {
            case 'file': 
                store = require('./Stores/FileStore').newNetworkGlobalsStoresFileStore(name)
                return
            case 'mongodb': 
                store = require('./Stores/MongoDbStore').newNetworkGlobalsStoresMongoDBStore(name)
                return
            default: throw new Error('The store type ' + storeType + ' is not implemented, why not create it yourself.')
        }
    }

    function finalize() {
        store = undefined
    }

    /**
     * @param {any} item 
     * @returns {Promise<any>}
     */
    function saveItem(item) {
        return store.saveItem(item)
    }

    /**
     * @param {any} items 
     * @returns {Promise<any>}
     */
    function saveAll(items) {
        return store.saveAll(items)
    }

    /**
     * @param {any} item 
     * @returns {Promise<any>}
     */
    function deleteItem(item) {
        return store.deleteItem(item)
    }

    /**
     * @param {any} item 
     * @returns {Promise<any>}
     */
    function deleteAll() {
        return store.deleteAll();
    }

    /**
     * @param {any} itemId 
     * @returns {Promise<any>}
     */
    function findItem(itemId) {
        return store.findItem(itemId)
    }

    /**
     * @param {any} itemIds
     * @returns {Promise<any>}
     */
    function findMany(itemIds) {
        return store.findMany(itemIds)
    }
}