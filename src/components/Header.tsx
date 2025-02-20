import Avatar from '@/assets/images/stack.png';
import { Box } from '@mui/material';
import Image from 'next/image';

function Header() {
  return (
    <Box
      sx={{
        height: 72,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingX: '32px',
        borderBottom: '1px solid rgba(145, 158, 171, 0.12)',
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 100,
      }}
    >
      <Image src={Avatar} alt="Avatar" width={48} height={48} />
    </Box>
  );
}

export default Header;
