import config from 'react-global-configuration';
import prod from './prod';
import dev from './dev';

if (window.location.hostname === 'localhost' ) {
  config.set(prod, {freeze: false});
  config.set(dev, {assign: true});
} else {
  config.set(prod);
}
