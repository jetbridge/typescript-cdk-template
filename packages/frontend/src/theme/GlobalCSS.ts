import { makeStyles } from "@material-ui/styles"
import { primaryFont } from "."

/**
 * A hook that installs global CSS overrides.
 */
const useGlobalCSS = makeStyles({
  "@global": {
    body: {
      fontFamily: primaryFont,
    },
  },
})

export default useGlobalCSS
