import Expo from "expo";

export async function getAudioPermissionAsync() {
  const { Permissions } = Expo;
  const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  if (status !== "granted") {
    throw new Error("Location permission not granted");
  }
}
