import { Box, Skeleton, Typography } from "@mui/material"

function SkeletonCreatorDocumentsList() {
  return (
    <Box>
        <Typography variant="h5">Документы</Typography>
        <Box sx={{ display: "flex", gap: "10px", mt: "10px" }}>
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="100px"
              sx={{ borderRadius: "30px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="20px"
              sx={{ mt: "10px" }}
            />
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="100px"
              sx={{ borderRadius: "30px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="20px"
              sx={{ mt: "10px" }}
            />
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="100px"
              sx={{ borderRadius: "30px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="20px"
              sx={{ mt: "10px" }}
            />
          </Box>
        </Box>
      </Box>
  )
}

export default SkeletonCreatorDocumentsList