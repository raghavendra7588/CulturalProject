import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicuserService {
  name = "test";
  constructor() {
  }



  checkLocalCache(): boolean {
    const jwtToken = sessionStorage.getItem('role');
    // const loggedInUserId = localStorage.getItem('user');

    return !(
      jwtToken === undefined ||
      jwtToken === null ||
      jwtToken.length === 0
    );
  }

  setLocalCache(role: string, roleId: number, districtId: number) {

    sessionStorage.setItem('role', role);
    sessionStorage.setItem('RoleId', roleId.toString());
    sessionStorage.setItem('DistrictId', districtId.toString());
    // localStorage.setItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID, basicuser.id.toString());
    // this.basicuser = basicuser;
  }

  clearLocalCache() {
    // localStorage.setItem(this.constantService.LOCAL_STORAGE_JWTTOKEN, JSON.stringify({}));
    // localStorage.setItem(this.constantService.LOCAL_STORAGE_LOGGEDINUSER_ID, JSON.stringify({}));
    sessionStorage.clear();
    // this.basicuser = null;
  }

  isLoggedIn(): boolean {
    if (this.checkLocalCache()) {
      return true;
    }
    return false;
  }

}
