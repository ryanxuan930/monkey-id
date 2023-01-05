/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/*
This module is to provide an easy way to fetch data from the server.
*/

import axios from 'axios';
import { useRouter } from 'vue-router';
import Config from './vue-request-config';

export default class VueRequest extends Config {
  constructor(token: string|undefined = undefined) {
    super();
    if (token !== undefined) {
      this.authToken = `Bearer ${token}`;
    }
  }

  private router = useRouter();

  // error handler
  // eslint-disable-next-line class-methods-use-this
  private ErrHdl(error: any) {
    if (error.response) {
      if (error.response.data.message === 'Unauthenticated.') {
        this.router.push('/login');
        localStorage.removeItem('monkeyIdTemp');
      }
      // this.LogError(JSON.stringify(error.response));
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }

  // method
  public Get(url: string, refReturn: any = null, sameOrgin = true, haveAuth = false) {
    return axios.get(sameOrgin ? this.prefix + url : url, {
      headers: {
        Authorization: haveAuth ? this.authToken : undefined,
        Accept: this.acceptHeader,
        'Content-Type': this.contentType,
      },
    })
      .then((res) => {
        if (refReturn !== null) {
          refReturn.value = res.data;
        }
        return res.data;
      })
      .catch((err) => { this.ErrHdl(err); });
  }

  public Post(url: string, dataset: any, refReturn: any = null, sameOrgin = true, haveAuth = false) {
    return axios.post(sameOrgin ? this.prefix + url : url, dataset, {
      headers: {
        Authorization: haveAuth ? this.authToken : undefined,
        Accept: this.acceptHeader,
        'Content-Type': this.contentType,
      },
    })
      .then((res) => {
        if (refReturn !== null) {
          refReturn.value = res.data;
        }
        return res.data;
      })
      .catch((err) => { this.ErrHdl(err); });
  }

  public Patch(url: string, dataset: any, refReturn: any = null, sameOrgin = true, haveAuth = false) {
    return axios.patch(sameOrgin ? this.prefix + url : url, dataset, {
      headers: {
        Authorization: haveAuth ? this.authToken : undefined,
        Accept: this.acceptHeader,
        'Content-Type': this.contentType,
      },
    })
      .then((res) => {
        if (refReturn !== null) {
          refReturn.value = res.data;
        }
        return res.data;
      })
      .catch((err) => { this.ErrHdl(err); });
  }

  public Delete(url: string, refReturn: any = null, sameOrgin = true, haveAuth = false) {
    return axios.delete(sameOrgin ? this.prefix + url : url, {
      headers: {
        Authorization: haveAuth ? this.authToken : undefined,
        Accept: this.acceptHeader,
        'Content-Type': this.contentType,
      },
    })
      .then((res) => {
        if (refReturn !== null) {
          refReturn.value = res.data;
        }
        return res.data;
      })
      .catch((err) => { this.ErrHdl(err); });
  }

  public File(url: string, fileHtmlEntity: any, refReturn: any = null, sameOrgin = true, haveAuth = false) {
    return axios.postForm(sameOrgin ? this.prefix + url : url, {
      'files[]': fileHtmlEntity.files,
    }, {
      headers: {
        Authorization: haveAuth ? this.authToken : undefined,
        Accept: this.acceptHeader,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        if (refReturn !== null) {
          refReturn.value = res.data;
        }
        return res.data;
      })
      .catch((err) => { this.ErrHdl(err); });
  }
}
