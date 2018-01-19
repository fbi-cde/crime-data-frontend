/* eslint no-undef: 0 */

import { lookupStateByName, lookupStateByAbbr, lookupRegionByName,
  lookupRegionByCode, lookupStatesByRegion, isValidRegion, isValidState,
  generatePlaceId, validateFilter, lookupDisplayName,
  generateDisplayName, getPlaceId } from '../../src/util/location'

describe('location utility', () => {
  describe('lookupStateByName', () => {
    const wv = { state_name: 'West Virginia' };
    it('should return West Virginia for West Virginia', () => {
      expect(lookupStateByName([wv], 'West Virginia')).toEqual(wv)
    });
    it('should return West Virginia for west virginia', () => {
      expect(lookupStateByName([wv], 'west virginia')).toEqual(wv)
    });
    it('should return null for empty stateData', () => {
      expect(lookupStateByName(undefined, '')).toEqual(null)
    });
    it('should return united-states for stateData of usa', () => {
      expect(lookupStateByName('usa', '')).toEqual('united-states')
    });
    it('should return null for non-matching', () => {
      expect(lookupStateByName([wv], 'Connecticut')).toEqual(null)
    });
  });

  describe('lookupStateByAbbr', () => {
    const wv = { state_abbr: 'WV' };
    it('should return WV for WV', () => {
      expect(lookupStateByAbbr([wv], 'WV')).toEqual(wv)
    });
    it('should return null for empty stateData', () => {
      expect(lookupStateByAbbr(undefined, '')).toEqual(null)
    });
    it('should return united-states for stateData of usa', () => {
      expect(lookupStateByAbbr('usa', '')).toEqual('united-states')
    });
    it('should return null for non-matching', () => {
      expect(lookupStateByAbbr([wv], 'CT')).toEqual(null)
    });
  });

  describe('lookupRegionByName', () => {
    const us = { region_name: 'U.S. Territories' };
    const ne = { region_name: 'Northeast' };

    it('should return U.S. Territories for U.S. Territories', () => {
      expect(lookupRegionByName([us, ne], 'U.S. Territories')).toEqual(us)
    });
    it('should return U.S. Territories for u.s. territories', () => {
      expect(lookupRegionByName([us, ne], 'u.s. territories')).toEqual(us)
    });
    it('should return null for empty regionData', () => {
      expect(lookupRegionByName(undefined, '')).toEqual(null)
    });
    it('should return null for non-matching', () => {
      expect(lookupRegionByName([us, ne], 'MX')).toEqual(null)
    });
  });

  describe('lookupRegionByCode', () => {
    const us = { region_code: 0 };
    const ne = { region_code: 1 };

    it('should return U.S. Territories for 0', () => {
      expect(lookupRegionByCode([us, ne], 0)).toEqual(us)
    });
    it('should return null for empty regionData', () => {
      expect(lookupRegionByCode(undefined, '')).toEqual(null)
    });
    it('should return null for non-matching', () => {
      expect(lookupRegionByCode([us, ne], 2)).toEqual(null)
    });
  });

  describe('lookupStatesByRegion', () => {
    const me = { state_code: 'ME', region_code: 1 };
    const fl = { state_code: 'FL', region_code: 2 };
    const wa = { state_code: 'WA', region_code: 3 };
    const ca = { state_code: 'CA', region_code: 4 };

    it('should return me for 1', () => {
      expect(lookupStatesByRegion([me, fl, wa, ca], 1)).toEqual([me])
    });
    it('should return fl for 2', () => {
      expect(lookupStatesByRegion([me, fl, wa, ca], 2)).toEqual([fl])
    });
    it('should return wa for 3', () => {
      expect(lookupStatesByRegion([me, fl, wa, ca], 3)).toEqual([wa])
    });
    it('should return ca for 4', () => {
      expect(lookupStatesByRegion([me, fl, wa, ca], 4)).toEqual([ca])
    });
    it('should return [] for 5', () => {
      expect(lookupStatesByRegion([me, fl, wa, ca], 5)).toEqual([]);
    });
  });

  describe('isValidRegion', () => {
    const us = { region_name: 'U.S. Territories' };
    const ne = { region_name: 'Northeast' };

    it('should return true for U.S. Territories', () => {
      expect(isValidRegion([us, ne], 'U.S. Territories')).toEqual(true)
    });
    it('should return true for u.s. territories', () => {
      expect(isValidRegion([us, ne], 'u.s. territories')).toEqual(true)
    });
    it('should return false for empty regionData', () => {
      expect(isValidRegion(undefined, '')).toEqual(false)
    });
    it('should return false for non-matching', () => {
      expect(isValidRegion([us, ne], 'MX')).toEqual(false)
    });
  });

  describe('isValidState', () => {
      const wv = { state_name: 'West Virginia' };
      it('should return true for West Virginia', () => {
        expect(isValidState([wv], 'West Virginia')).toEqual(true)
      });
      it('should return West Virginia for west virginia', () => {
        expect(isValidState([wv], 'west virginia')).toEqual(true)
      });
      it('should return null for empty stateData', () => {
        expect(isValidState(undefined, '')).toEqual(false)
      });
      it('should return united-states for stateData of usa', () => {
        expect(isValidState('usa', '')).toEqual(true)
      });
      it('should return null for non-matching', () => {
        expect(isValidState([wv], 'Connecticut')).toEqual(false)
      });
  });

  describe('generatePlaceId', () => {
    const us = { region_name: 'U.S. Territories', region_code: 0 };
    const ne = { region_name: 'Northeast', region_code: 1 };
    const wv = { state_name: 'West Virginia', state_abbr: 'WV' };
    it('should return WV for state/West Virginia', () => {
      expect(generatePlaceId({ placeType: 'state', place: 'West Virginia' }, [us, ne], [wv])).toEqual('WV');
    });
    it('should return 0 for region/U.S. Territories', () => {
      expect(generatePlaceId({ placeType: 'region', place: 'U.S. Territories' }, [us, ne], [wv])).toEqual(0);
    });
    it('should return national for national/*', () => {
      expect(generatePlaceId({ placeType: 'national' }, [us, ne], [wv])).toEqual('national');
    });
    it('should return null for invalid placeType', () => {
      expect(generatePlaceId({ placeType: 'foxy' }, [us, ne], [wv])).toEqual(null);
    })
  });

  describe('validateFilter', () => {
      const us = { region_name: 'U.S. Territories', region_code: 0 };
      const ne = { region_name: 'Northeast', region_code: 1 };
      const wv = { state_name: 'West Virginia', state_abbr: 'WV' };
      it('should return true for state and West Virginia', () => {
        expect(validateFilter({ placeType: 'state', place: 'West Virginia' }, [us, ne], [wv])).toEqual(true);
      });
      it('should return false for state and Nebraska', () => {
        expect(validateFilter({ placeType: 'state', place: 'Nebraska' }, [us, ne], [wv])).toEqual(false);
      });
      it('should return true for region and U.S. Territories', () => {
        expect(validateFilter({ placeType: 'region', place: 'U.S. Territories' }, [us, ne], [wv])).toEqual(true);
      });
      it('should return false for region and Artic', () => {
        expect(validateFilter({ placeType: 'region', place: 'Artic' }, [us, ne], [wv])).toEqual(false);
      });
      it('should return true for agency', () => {
        expect(validateFilter({ placeType: 'agency' }, [us, ne], [wv])).toEqual(true);
      });
      it('should return true for national', () => {
        expect(validateFilter({ placeType: 'national' }, [us, ne], [wv])).toEqual(true);
      });
      it('should return false for invalid placeType', () => {
        expect(validateFilter({ placeType: 'foxy' }, [us, ne], [wv])).toEqual(false);
      });
  });

  describe('lookupDisplayName', () => {
      const us = { region_name: 'U.S. Territories', region_code: 0 };
      const ne = { region_name: 'Northeast', region_code: 1 };
      const wv = { state_name: 'West Virginia', state_abbr: 'WV' };
      it('should return West Virginia for state/West Virginia', () => {
        expect(lookupDisplayName({ placeType: 'state', place: 'West Virginia' }, [us, ne], [wv])).toEqual('West Virginia');
      });
      it('should return West Virginia for state/west virginia', () => {
        expect(lookupDisplayName({ placeType: 'state', place: 'West Virginia' }, [us, ne], [wv])).toEqual('West Virginia');
      });
      it('should return United States Region for national/united-states', () => {
        expect(lookupDisplayName({ placeType: 'national', place: 'united-states' }, [us, ne], [wv])).toEqual('United States');
      });
      it('should return Northeast Region for region/Northeast', () => {
        expect(lookupDisplayName({ placeType: 'region', place: 'Northeast' }, [us, ne], [wv])).toEqual('Northeast Region');
      });
  });

  describe('generateDisplayName', () => {
    it('should return West Virginia for west-virginia/state', () => {
      expect(generateDisplayName('west-virginia', 'state')).toEqual('West Virginia');
    });
    it('should return Northeast Region for northeast/region', () => {
      expect(generateDisplayName('northeast', 'region')).toEqual('Northeast Region');
    });
    it('should return United States for united-states/region', () => {
      expect(generateDisplayName('united-states', 'region')).toEqual('United States');
    });
  });

  describe('getPlaceId', () => {
      const us = { region_name: 'U.S. Territories', region_code: 0 };
      const ne = { region_name: 'Northeast', region_code: 1 };
      const wv = { state_name: 'West Virginia', state_abbr: 'WV' };
      it('should return WV for west-virginia/state', () => {
        expect(getPlaceId({ placeType: 'state', place: 'west-virginia' }, [us, ne], [wv])).toEqual('WV');
      });
      it('should return 0 for U.S. Territories/region', () => {
        expect(getPlaceId({ placeType: 'region', place: 'U.S. Territories' }, [us, ne], [wv])).toEqual(0);
      });
      it('should return null for nonPlaceType', () => {
        expect(getPlaceId({ placeType: 'nonPlaceType', place: 'U.S. Territories' }, [us, ne], [wv])).toEqual(null);
      });
  });

})
