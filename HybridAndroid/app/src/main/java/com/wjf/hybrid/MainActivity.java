package com.wjf.hybrid;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

import javax.annotation.Nullable;

public class MainActivity extends ReactActivity {

//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
//    }

    @Nullable
    @Override
    protected String getMainComponentName() {
        return "RNPage";
    }
}
