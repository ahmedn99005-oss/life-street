# lib

- `web-llm-worker.js`: the brain's optional on-device language model runner. It bundles [WebLLM](https://github.com/mlc-ai/web-llm) (`@mlc-ai/web-llm` 0.2.87, Apache-2.0, see `web-llm-LICENSE.txt`) inside a Web Worker. It is loaded only when you enable «مخ البنات» in the game settings.
- The model files themselves (Qwen3 1.7B or 4B, Apache-2.0, quantized by MLC) are downloaded by the phone from huggingface.co and the model runtime from raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs on first use, then cached in the browser.
