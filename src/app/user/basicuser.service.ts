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
  }

  clearLocalCache() {
    sessionStorage.clear();
  }

  isLoggedIn(): boolean {
    if (this.checkLocalCache()) {
      return true;
    }
    return false;
  }

}
