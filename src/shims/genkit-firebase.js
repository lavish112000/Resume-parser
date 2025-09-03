// Lightweight shim for @genkit-ai/firebase used during builds when the real package isn't installed.
// This file provides the API surface expected by @genkit-ai/core for optional Firebase telemetry.

exports.enableFirebaseTelemetry = function enableFirebaseTelemetry() {
  return {
    enable: () => {},
    disable: () => {},
  };
};

exports.getFirebaseInstance = function getFirebaseInstance() {
  return null;
};
