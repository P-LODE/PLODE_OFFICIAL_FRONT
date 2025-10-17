/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

import { withSentryConfig } from '@sentry/nextjs'

const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  transpilePackages: ['@plode-front/core'],
  images: {
    domains: ['lh3.googleusercontent.com', 'example.com'],
  },
  webpack(config, { isServer, webpack }) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '')
      }),
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                  {
                    name: 'convertColors',
                    params: {
                      currentColor: true,
                    },
                  },
                  'removeDimensions',
                ],
              },
              typescript: true,
              dimensions: false,
              ref: true,
              svgProps: {
                width: 24,
                height: 24,
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|swf|ogv)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'static/media',
            publicPath: '/_next/static/media',
            name: '[name].[hash].[ext]',
          },
        },
      },
    )
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  async rewrites() {},
}

export default withSentryConfig(nextConfig, {
  org: '',
  project: '',
  slient: !process.env.CI,
  disableLogger: true,
  autoInstrumentServerFunctions: false,
  excludeServerRoutes: [],
  automaticVercelMonitors: true,
})
