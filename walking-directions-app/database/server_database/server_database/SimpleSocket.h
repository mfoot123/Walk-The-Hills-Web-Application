#ifndef SIMPLESOCKET
#define SIMPLESOCKET

#include <stdio.h>
#include <WinSock2.h>
#include <Ws2tcpip.h>
#include <iostream>

namespace HDE
{
	class SimpleSocket
	{
	public:
		SimpleSocket(int domain, int serivce, int protocol, int port, const char* ip);

		virtual int connect_to_network(int sock, struct sockaddr_in address) = 0;

		void test_connection(int item);

		struct sockaddr_in get_address();
		int get_sock();
		int get_connection();

		void set_connection(int connection);

	private:
		int mSock;
		int mConnection;
		struct sockaddr_in mAdress;
	};
}
#endif // !SIMPLESOCET
