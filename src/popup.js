const settings = 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no';

const getPopupOffset = ({ width, height }) => {
  const wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  const wTop = window.screenTop ? window.screenTop : window.screenY;

  const left = wLeft + (window.innerWidth / 2) - (width / 2); // eslint-disable-line
  const top = wTop + (window.innerHeight / 2) - (height / 2); // eslint-disable-line

  return { top, left };
};

const getPopupSize = (provider) => {
  switch (provider) {
    case 'facebook':
      return { width: 580, height: 400 };
    case 'google':
      return { width: 452, height: 633 };
    case 'twitter':
      return { width: 495, height: 645 };
    case 'instagram':
      return { width: 500, height: 560 };
    default:
      return { width: 1020, height: 618 };
  }
};

const getPopupDimensions = (provider) => {
  const { width, height } = getPopupSize(provider);
  const { top, left } = getPopupOffset({ width, height });

  return `width=${width},height=${height},top=${top},left=${left}`;
};

export default (provider, url, name = '_blank') =>
  window.open(url, name, provider !== 'newTab' ? `${settings},${getPopupDimensions(provider)}` : '');
