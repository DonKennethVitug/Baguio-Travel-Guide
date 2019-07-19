/**
 * Provides a single interface for the Loading model to be used in other modules
 * Used in data transfers as well as interface rendering
 * 
 * @file loading.model
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com>
 * @license UNLICENSED
 * @copyright Qpons 2017
 */

/**
 * Used to describe Loading
 * 
 * @export
 * @class Loading
 * @property {boolean} isLoading
 * @property {string} msg
 * @property {string} percentage
 */
export class Loading {

    /**
     * Used to represent logical proposition of loading 
     * 
     * @name isLoading
     * @type {boolean}
     * @memberof Loading
     */
    isLoading: boolean = false;
  
    /**
     * Used to store Loading"s Message 
     * 
     * @name msg
     * @type {string}
     * @memberof Loading
     */
    msg?: string = "Loading";
  
    /**
     * Used to store Loading"s Percentage
     * 
     * @name percentage
     * @type {string}
     * @memberof Loading
     */
    percentage?: string = "0";
  
  }
  