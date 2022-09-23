
export async function wait(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

// ref: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
export function getHash(inp, mod = 1) {
  inp = inp || "";
  let hash = 28213, i, chr;
  for (i = 0; i < inp.length; i++) {
    chr = inp.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash % mod);
}

/**

  let readFn = async (url) => {
    let resp = await this.$api.get(url);
    return resp;
  }

  let parallelReads = await utils.getResultsInParallel(urls, readFn);

*/

export async function getResultsInParallel(arr, fn) {
  let promisesArr = arr.map((item) => {
    return new Promise(async (resolve, reject) => {
      try {
        let res;
        if (Array.isArray(item)) {
          res = await fn(...item);
        } else {
          res = await fn(item);
        }
        resolve(res);
        return res;
      } catch(ex) {
        console.error(ex);
        reject(ex);
      }
    });
  });
  let promiseResults = await Promise.allSettled(promisesArr);
  return promiseResults;
}

/**

                              888                             888    888      d8b                            
                              888                             888    888      Y8P                            
                              888                             888    888                                     
888d888 8888b.  88888b.   .d88888  .d88b.  88888b.d88b.       888888 88888b.  888 88888b.   .d88b.  .d8888b  
888P"      "88b 888 "88b d88" 888 d88""88b 888 "888 "88b      888    888 "88b 888 888 "88b d88P"88b 88K      
888    .d888888 888  888 888  888 888  888 888  888  888      888    888  888 888 888  888 888  888 "Y8888b. 
888    888  888 888  888 Y88b 888 Y88..88P 888  888  888      Y88b.  888  888 888 888  888 Y88b 888      X88 
888    "Y888888 888  888  "Y88888  "Y88P"  888  888  888       "Y888 888  888 888 888  888  "Y88888  88888P' 
                                                                                                888          
                                                                                           Y8b d88P          
                                                                                            "Y88P"           

*/

export function randomNumber(min, max) {
  return Math.abs(Math.round(Math.random() * (max - min) + min));
}

export function getRandomItems(arr, num = 1, changeEverytime = false) {
  let sortFn = (a, b) => a < b ? -1 : 1;
  if (changeEverytime) {
    sortFn = () => 0.5 - Math.random();
  }
  let shuffled = [...arr].sort(sortFn);
  return shuffled.slice(0, num);
}

/** 
                                                                                  
888                     888                                888            888      
888                     888                                888            888      
888                     888                                888            888      
888888 .d88b.  888  888 888888      88888b.d88b.   8888b.  888888 .d8888b 88888b.  
888   d8P  Y8b `Y8bd8P' 888         888 "888 "88b     "88b 888   d88P"    888 "88b 
888   88888888   X88K   888         888  888  888 .d888888 888   888      888  888 
Y88b. Y8b.     .d8""8b. Y88b.       888  888  888 888  888 Y88b. Y88b.    888  888 
 "Y888 "Y8888  888  888  "Y888      888  888  888 "Y888888  "Y888 "Y8888P 888  888 
                                                                                  
*/

// ref: https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
export function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  let costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

export function similarity(s1, s2) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  let longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}


const DEFAULT_WORD_SIMILARITY_THRESHOLD = 0.7;

// returns if inputText has a fuzzy match(default within 70% levenstein distance) with any of the targetWords
export function performFuzzyTextMatch(inputText, targetWords, opts) {
  let defaultOpts = {
    caseInsen: true,
    exactMatch: false,
    similarityThreshold: DEFAULT_WORD_SIMILARITY_THRESHOLD
  };
  let _opts = { ...defaultOpts, ...(opts || {}) };
  if (!Array.isArray(targetWords)) targetWords = [targetWords];
  let caseInsen = _opts.caseInsen;
  let exactMatch = _opts.exactMatch;
  let doesMatchTgtWd = targetWords.map(w => {
    let doesMatch = false;
    if (caseInsen) w = w.toLowerCase();
    if (exactMatch) doesMatch = w === inputText;
    else doesMatch = similarity(inputText, w) > _opts.similarityThreshold;
    return doesMatch;
  });
  let hasAMatch = doesMatchTgtWd.reduce((a, b) => a || b, false);
  return hasAMatch;
}