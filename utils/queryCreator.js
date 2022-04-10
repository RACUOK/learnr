'use strict';

const mongoose = require('mongoose')

module.exports = {
    
    /** 
     * Select query where comparison is done by unique columns and values
     * 
     * @collectionName {string} collectioName to select from
     * @returns {object} - JSON object
     */
    
    selectWithAnd: async function(collectionName, comparisonColumnsAndValues, columnsToSelect, sortColumnAndValues) {
        const dbCollection = mongoose.model(collectionName);
        try {
            return await dbCollection.find(comparisonColumnsAndValues, columnsToSelect).sort(sortColumnAndValues);
        } catch (err) {
            console.log('Query error in selectWithAnd : ',err);
            return false;
        }
    },

    selectWithAndOne: async function(collectionName, comparisonColumnsAndValues) {
        const dbCollection = mongoose.model(collectionName);
        try {
            return await dbCollection.findOne(comparisonColumnsAndValues);
        } catch (error) {
            console.log('Query error in selectWithAndOne : ',err);
            return false;
        }
    },

    /**
     * Insert single record
     * 
     * @collectionName {string} collectionName to select from
     * @param {object} sortColumnAndValues values and columns
     */
    insertSingle: async function(collectionName, columnsAndValues) {
        const dbCollection = mongoose.model(collectionName);
        try {
            return await dbCollection.create(columnsAndValues);
        } catch (err) {
            console.error('Query error in insertSingle: ', err);
        }
    },

    /**
     * Updates a single record
     * 
     * @collectionName {string} collectionName to update
     * @columnsToUpdate {Object} Columns and values to update
     * @targetColumnsAndValues {Object} targetColumnsAndValues to identify the update record
     */
    updateSingle: async function(collectionName, columnsToUpdate, targetColumnsAndValues) {
        const dbCollection = mongoose.model(collectionName);
        var options = {
            multi: true
        };
        try {
            return await dbCollection.updateOne(targetColumnsAndValues, columnsToUpdate, options);
        } catch (err) {
            console.error('Query error in updateSingle: ', err);
        }
    },

    /**
     * delete a multiple record
     * 
     * @collectionName {string} collectionname to update
     * @columnsToUpdate {Object} Columns and values to update
     * @targetColumnsAndValues {Object} targetColumnsAndValues to identify the update record
     */
    removeMultiple: async function(collectionName, targetColumnsAndValues) {
        const dbCollection = mongoose.model(collectionName);
        try {
            return await dbCollection.remove(targetColumnsAndValues);
        } catch (err) {
            console.error('Query error in removeMultiple: ', err);
        }
    }

}