import { useEffect, useState } from 'react';
import Algolia from '../assets/serviceicons/algolia_logo.png';
import Amplience from '../assets/serviceicons/amplience_logo.png';
import Basket from '../assets/serviceicons/basket.png';
import BigCommerce from '../assets/serviceicons/bigcommerce_logo.png';
import Catalog from '../assets/serviceicons/catalog.png';
import Commercetools from '../assets/serviceicons/commercetools_logo.png';
import Content from '../assets/serviceicons/content.png';
import Contentful from '../assets/serviceicons/contentful_logo.png';
import ContentStack from '../assets/serviceicons/contentstack_logo.png';
import Customer from '../assets/serviceicons/customer.png';
import Default from '../assets/serviceicons/default.png';
import Lucidworks from '../assets/serviceicons/lucidworks_logo.png';
import Magento from '../assets/serviceicons/magento_logo.png';
import Magnolia from '../assets/serviceicons/magnolia_logo.png';
import Payment from '../assets/serviceicons/payment.png';
import Recommendations from '../assets/serviceicons/recommendations.png';
import Search from '../assets/serviceicons/search.png';
import Visa from '../assets/serviceicons/visa_logo.png';

export function useIcons() {
  const [icons, setIcons] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (icons && icons.size === 0) {
      const newMap = new Map();
      newMap.set('algolia_logo', Algolia);
      newMap.set('amplience_logo', Amplience);
      newMap.set('basket', Basket);
      newMap.set('bigcommerce_logo', BigCommerce);
      newMap.set('catalog', Catalog);
      newMap.set('commercetools_logo', Commercetools);
      newMap.set('content', Content);
      newMap.set('contentful_logo', Contentful);
      newMap.set('contentstack_logo', ContentStack);
      newMap.set('customer', Customer);
      newMap.set('default', Default);
      newMap.set('lucidworks_logo', Lucidworks);
      newMap.set('magento_logo', Magento);
      newMap.set('magnolia_logo', Magnolia);
      newMap.set('payment', Payment);
      newMap.set('recommendations', Recommendations);
      newMap.set('search', Search);
      newMap.set('visa_logo', Visa);
      setIcons(newMap);
    }
  }, [icons]);

  return icons;
}

export default useIcons;
