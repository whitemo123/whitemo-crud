import { src, dest } from "gulp"
import less from "gulp-less"
import { pkgRoot, buildRoot } from "../../utils/paths";

// 打包less文件
export const buildLess = (projectNo: string) => {
  return src(`${pkgRoot}/${projectNo}/components/**/style/**.less`)
    .pipe(less())
    .pipe(dest(`${buildRoot}/${projectNo}/lib/components`))
    .pipe(dest(`${buildRoot}/${projectNo}/es/components`));
}
