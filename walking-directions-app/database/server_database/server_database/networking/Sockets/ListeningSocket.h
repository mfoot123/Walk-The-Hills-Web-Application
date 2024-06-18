#ifndef LISTENINGSOCKET
#define LISTENINGSOCKET

#include "BindingSocket.h"

namespace HDE
{
	class ListeningSocket : public BindingSocket
	{
	public:
		ListeningSocket(int domain, int serivce, int protocol, int port, const char* ip, int backlog);

		void startListening();
	private:
		int mBacklog;
		int mListening;
	};
}
#endif // !LISTENINGSOCKET
