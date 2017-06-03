package com.wjf.hybrid;

import android.app.Application;
import android.content.Context;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

/**
 * Created by weijianfeng on 2017/6/3.
 */

public class MyApplication extends Application implements ReactApplication {

    private static Context mContext;

    private ReactContext mReactContext;

    @Override
    public void onCreate() {
        super.onCreate();
        mContext = getApplicationContext();
    }

    public static Context getContext() {
        return mContext;
    }

    public ReactContext getReactContext() {
        return mReactContext;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

//        @Nullable
//        @Override
//        protected String getJSBundleFile() {
////            return super.getJSBundleFile();
//            return CodePush.getJSBundleFile();
//        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage()
//                    new CodePush("n__4_YKyHDs-WsJ56Nw-sUSpqaBHEJrh3polX",HuobanApp.this, BuildConfig.DEBUG)
            );
        }
    };
    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    private void registerReactInstanceEventListener() {
        mReactNativeHost.getReactInstanceManager().addReactInstanceEventListener(mReactInstanceEventListener);
    }
    private void unRegisterReactInstanceEventListener() {
        mReactNativeHost.getReactInstanceManager().removeReactInstanceEventListener(mReactInstanceEventListener);
    }
    private final ReactInstanceManager.ReactInstanceEventListener mReactInstanceEventListener = new ReactInstanceManager.ReactInstanceEventListener() {
        @Override
        public void onReactContextInitialized(ReactContext context) {
            mReactContext = context;
        }
    };
}
