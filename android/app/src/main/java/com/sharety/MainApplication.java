package com.sharety;

import android.app.Application;

import com.facebook.react.ReactApplication;
import ui.notificationbanner.RNNotificationBannerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.horcrux.svg.SvgPackage;
import ui.morphingtext.RNMorphingTextPackage;
import com.wix.interactable.Interactable;
import ui.materialshadows.RNMaterialShadowsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNNotificationBannerPackage(), new RNFirebaseAdMobPackage(), new RNCWebViewPackage(),
          new ReactVideoPackage(), new RNSpinkitPackage(), new RNFirebasePackage(), new BlurViewPackage(),
          new SvgPackage(), new RNMorphingTextPackage(), new Interactable(), new RNMaterialShadowsPackage(),
          new RNGestureHandlerPackage(), new LinearGradientPackage(), new VectorIconsPackage(),
          new RNFirebaseAnalyticsPackage(), new RNFirebaseMessagingPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
