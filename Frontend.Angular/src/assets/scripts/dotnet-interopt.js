export default function invokeMethodAsync(method, parameters) {
  return DotNet.invokeMethodAsync("Backend", method, parameters);
}
