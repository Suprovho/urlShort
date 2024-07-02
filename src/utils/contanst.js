export const WEB_URL="https://snipitt.netlify.app/"

 export const truncateURL = (text) => {
      if (!text || text.length <= 4) return text;
      if (!text || text.length >= 40) return `${text.slice(0,3)}...${text.slice(-6)}...`;
      return `${text.slice(0,3)}...${text.slice(-7)}`;
    };

 export const longtruncateURL = (text) => {
      if (!text || text.length <= 30) return text;
      return `${text.slice(0,3)}...${text.slice(-60)}...`;
    };