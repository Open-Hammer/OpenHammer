#include<bits/stdc++.h>
using namespace std;
#define ll long long
bool chk(vector<ll>&v,int k,int d){
    unordered_map<ll,ll>mp;
    int n=v.size();
    int cnt=0;
    for(auto it:v){
        if(mp.count(it-d)==0 && mp.count(it+d)==0){
            mp[it]++;
        }else cnt++;
    }
    return cnt<=k;
}
int main(){
    ll n,d;
    cin>>n>>d;
    vector<ll>v(n);
    for(auto &it:v) cin>>it;
    ll s=0;
    ll e=n;
    ll ans=0;
    while(s<=e){
        ll mid=s+(e-s)/2;
        if(chk(v,mid,d)){
            ans=mid;
            e=mid-1;
        }else{
            s=mid+1;
        }
    }
    cout<<ans<<endl;
}