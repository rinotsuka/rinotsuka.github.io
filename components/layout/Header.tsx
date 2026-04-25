import Image from "next/image";
import Link from "next/link";

const LOGO_SIZE = 64; // ロゴ画像サイズ（px）
const LOGO_SIDE_PADDING = 6; // ロゴ左右の余白（px）
const LOGO_BOTTOM_PADDING = 6; // ロゴ下側の余白（px）
const CURVE_SMOOTHNESS = 16; // 直線と丸の接続部の丸み（px）

const HEADER_HEIGHT = 38; // ヘッダーバー高さ（px）。chord 位置はここから自動算出

const SVG_BASE_WIDTH = 140; // ロゴ背景プレートの最小幅（px）
const SVG_BASE_HEIGHT = 60; // ロゴ背景プレートの最小高さ（px）
const SVG_SAFE_PADDING = 8; // 図形が切れないための安全マージン（px）
const SVG_TOP_OFFSET = 20; // `top-[20px]` と同期するSVG配置オフセット（px）
const LOGO_TOP_OFFSET = 8; // `top-2` と同期するロゴ配置オフセット（px）
const SHAPE_TOP_Y = HEADER_HEIGHT - SVG_TOP_OFFSET; // chord は header 底辺に一致

function solveJoinSlope(
  centerY: number,
  ellipseRadiusX: number,
  ellipseRadiusY: number,
  shoulderRadius: number
) {
  const evaluate = (slope: number) => {
    const ellipseRatio = (slope * ellipseRadiusX) / ellipseRadiusY;
    const ellipseVertical = 1 / Math.sqrt(1 + ellipseRatio * ellipseRatio);
    const shoulderVertical = 1 / Math.sqrt(1 + slope * slope);

    const ellipseJoinY = centerY + ellipseRadiusY * ellipseVertical;
    const shoulderJoinY =
      SHAPE_TOP_Y + shoulderRadius * (1 - shoulderVertical);
    return ellipseJoinY - shoulderJoinY;
  };

  let low = 0;
  let high = 1;

  if (evaluate(low) <= 0) {
    return low;
  }

  while (evaluate(high) > 0 && high < 2048) {
    high *= 2;
  }

  if (evaluate(high) > 0) {
    return high;
  }

  for (let i = 0; i < 48; i += 1) {
    const mid = (low + high) / 2;
    if (evaluate(mid) > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return (low + high) / 2;
}

function buildLogoPlateGeometry() {
  const logoRadius = LOGO_SIZE / 2;
  const centerY = LOGO_TOP_OFFSET - SVG_TOP_OFFSET + logoRadius;
  const shoulderRadius = CURVE_SMOOTHNESS;
  const ellipseRadiusX = logoRadius + LOGO_SIDE_PADDING;
  const ellipseRadiusY = logoRadius + LOGO_BOTTOM_PADDING;
  const slope = solveJoinSlope(
    centerY,
    ellipseRadiusX,
    ellipseRadiusY,
    shoulderRadius
  );

  const shoulderVertical = 1 / Math.sqrt(1 + slope * slope);
  const shoulderHorizontal = slope * shoulderVertical;
  const ellipseRatio = (slope * ellipseRadiusX) / ellipseRadiusY;
  const ellipseVertical = 1 / Math.sqrt(1 + ellipseRatio * ellipseRatio);
  const ellipseHorizontal = ellipseRatio * ellipseVertical;

  const joinY = centerY + ellipseRadiusY * ellipseVertical;
  const plateHalfWidth =
    ellipseRadiusX * ellipseHorizontal + shoulderRadius * shoulderHorizontal;
  const svgWidth = Math.max(
    SVG_BASE_WIDTH,
    Math.ceil((plateHalfWidth + SVG_SAFE_PADDING) * 2)
  );
  const svgHeight = Math.max(
    SVG_BASE_HEIGHT,
    Math.ceil(centerY + ellipseRadiusY + SVG_SAFE_PADDING)
  );
  const centerX = svgWidth / 2;

  const leftTopX = centerX - plateHalfWidth;
  const rightTopX = centerX + plateHalfWidth;
  const rightJoinX = centerX + ellipseRadiusX * ellipseHorizontal;
  const leftJoinX = centerX - ellipseRadiusX * ellipseHorizontal;

  const format = (value: number) => value.toFixed(2);

  const path = [
    `M${format(leftTopX)},${format(SHAPE_TOP_Y)}`,
    `H${format(rightTopX)}`,
    `A${format(shoulderRadius)},${format(shoulderRadius)} 0 0,0 ${format(
      rightJoinX
    )},${format(joinY)}`,
    `A${format(ellipseRadiusX)},${format(ellipseRadiusY)} 0 0,1 ${format(
      leftJoinX
    )},${format(joinY)}`,
    `A${format(shoulderRadius)},${format(shoulderRadius)} 0 0,0 ${format(
      leftTopX
    )},${format(SHAPE_TOP_Y)}`,
    "Z",
  ].join(" ");

  return { path, svgWidth, svgHeight };
}

export function Header() {
  const { path, svgWidth, svgHeight } = buildLogoPlateGeometry();

  return (
    <header>
      <div className="relative" style={{ height: `${HEADER_HEIGHT}px` }}>
        <div className="absolute inset-0 bg-white" />
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width={svgWidth}
          height={svgHeight}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[20px] -translate-x-1/2"
        >
          <path d={path} fill="white" />
        </svg>
        <Link
          href="/"
          aria-label="rinotsuka ホームへ"
          className="absolute left-1/2 top-2 -translate-x-1/2 hover:opacity-80 transition"
        >
          <Image
            src="/logo.png"
            alt="rinotsuka"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            priority
            className="block"
          />
        </Link>
      </div>
    </header>
  );
}
